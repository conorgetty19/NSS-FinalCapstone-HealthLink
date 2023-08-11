/*
    ResultRepository.cs

    This file contains the implementation of the ResultRepository class, which provides methods
    to interact with result data in the database. The class inherits from BaseRepository, which
    helps to establish a database connection. The methods defined here allow performing CRUD
    (Create, Read, Update, Delete) operations on result entities.
*/

using HealthLink.Models;
using HealthLink.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace HealthLink.Repositories
{
    public class ResultRepository : BaseRepository, IResultRepository
    {
        public ResultRepository(IConfiguration configuration) : base(configuration) { }

        public List<Result> GetResultsByChallengeId(int challengeId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                            r.Id AS ResultId,
                                            r.ChallengeId AS ResultChallengeId,
                                            r.Content AS ResultContent,
                                            r.UpdateDateTime AS ResultUpdateDateTime,
                                            gu.Id AS GroupUserId,
                                            gu.GroupId,
                                            gu.UserProfileId AS GroupUserUserProfileId,
                                            up.Id AS UserProfileId,
                                            up.FirebaseUserId,
                                            up.Username,
                                            up.FullName,
                                            up.Email,
                                            up.ImageUrl,
                                            up.CreatedDateTime AS UserProfileCreatedDateTime
                                        FROM 
                                            Result r
                                        JOIN 
                                            GroupUser gu ON gu.Id = r.GroupUserId
                                        JOIN 
                                            UserProfile up ON gu.UserProfileId = up.Id
                                        WHERE 
                                            r.ChallengeId = @challengeId
                                        ";
                    cmd.Parameters.AddWithValue("@challengeId", challengeId);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Result> results = new List<Result>();
                        while (reader.Read())
                        {
                            results.Add(new Result()
                            {
                                Id = DbUtils.GetInt(reader, "ResultId"),
                                GroupUserId = DbUtils.GetInt(reader, "GroupUserId"),
                                ChallengeId = DbUtils.GetInt(reader, "ResultChallengeId"),
                                Content = DbUtils.GetString(reader, "ResultContent"),
                                UpdateDateTime = DbUtils.GetDateTime(reader, "ResultUpdateDateTime"),
                                groupUser = new GroupUser()
                                {
                                    Id = DbUtils.GetInt(reader, "GroupUserId"),
                                    GroupId = DbUtils.GetInt(reader, "GroupId"),
                                    UserProfileId = DbUtils.GetInt(reader, "GroupUserUserProfileId"),
                                    UserProfile = new UserProfile()
                                    {
                                        Id = DbUtils.GetInt(reader, "UserProfileId"),
                                        FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                        Username = DbUtils.GetString(reader, "Username"),
                                        Email = DbUtils.GetString(reader, "Email"),
                                        FullName = DbUtils.GetString(reader, "FullName"),
                                        ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                        CreatedDateTime = DbUtils.GetDateTime(reader, "UserProfileCreatedDateTime")
                                    }
                                }
                            });
                        }
                        return results;
                    }
                }
            }

        }

        public Result GetById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT 
                    r.Id AS ResultId,
                    r.ChallengeId AS ResultChallengeId,
                    r.GroupUserId AS ResultGroupUserId,
                    r.Content AS ResultContent,
                    r.UpdateDateTime AS ResultUpdateDateTime
                FROM 
                    Result r
                WHERE 
                    r.Id = @id
            ";

                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new Result()
                            {
                                Id = DbUtils.GetInt(reader, "ResultId"),
                                ChallengeId = DbUtils.GetInt(reader, "ResultChallengeId"),
                                GroupUserId = DbUtils.GetInt(reader, "ResultGroupUserId"),
                                Content = DbUtils.GetString(reader, "ResultContent"),
                                UpdateDateTime = DbUtils.GetDateTime(reader, "ResultUpdateDateTime")
                            };
                        }
                        else
                        {
                            return null; // If no result with the specified Id is found, return null
                        }
                    }
                }
            }
        }


        public void Add(Result result)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Result (GroupUserId, ChallengeId, Content, UpdateDateTime)
                                OUTPUT INSERTED.ID
                                VALUES (@groupUserId, @challengeId, @content, GETDATE())";

                    cmd.Parameters.AddWithValue("@groupUserId", result.GroupUserId);
                    cmd.Parameters.AddWithValue("@challengeId", result.ChallengeId);
                    cmd.Parameters.AddWithValue("@content", result.Content);
                    result.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Result result)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE Result
                                        SET Content = @content,
                                            UpdateDateTime = GETDATE()
                                        WHERE Id = @id
                                                       ";
                    cmd.Parameters.AddWithValue("@id", result.Id);
                    cmd.Parameters.AddWithValue("@content", result.Content);
                    cmd.ExecuteNonQuery();
                }
            }
        }


        public void Delete(int resultId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                DELETE FROM Result
                WHERE Id = @resultId
            ";

                    cmd.Parameters.AddWithValue("@resultId", resultId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
