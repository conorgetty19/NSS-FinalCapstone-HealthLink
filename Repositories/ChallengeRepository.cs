/*
    ChallengeRepository.cs

    This file contains the implementation of the ChallengeRepository class.
    ChallengeRepository is responsible for handling database operations related to challenges.

    - GetChallengesByGroupId: Retrieves a list of challenges associated with a specific group ID.
    - GetChallengeById: Retrieves a challenge by its ID.
    - Add: Adds a new challenge to the database.
    - Update: Updates an existing challenge in the database.

    This repository extends the BaseRepository class, inheriting common database connection logic.
*/

using HealthLink.Models;
using HealthLink.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace HealthLink.Repositories
{
    public class ChallengeRepository : BaseRepository, IChallengeRepository
    {
        public ChallengeRepository(IConfiguration configuration) : base(configuration) { }

        public List<Challenge> GetChallengesByGroupId(int groupId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id AS ChallengeId,
                                        GroupId,
                                        Title AS ChallengeTitle,
                                        [Description]AS ChallengeDescription,
                                        CreatedDateTime AS ChallengeStartDate,
                                        EndDateTime AS ChallengeEndDateTime
                                        FROM [Challenge] 
                                    WHERE GroupId = @groupId";
                    cmd.Parameters.AddWithValue("@groupId", groupId);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var challenges = new List<Challenge>();
                        while (reader.Read())
                        {
                            challenges.Add(new Challenge
                            {
                                Id = DbUtils.GetInt(reader, "ChallengeId"),
                                GroupId = DbUtils.GetInt(reader, "GroupId"),
                                Title = DbUtils.GetString(reader, "ChallengeTitle"),
                                Description = DbUtils.GetString(reader, "ChallengeDescription"),
                                CreatedDateTime = DbUtils.GetDateTime(reader, "ChallengeStartDate"),
                                EndDateTime = DbUtils.GetDateTime(reader, "ChallengeEndDateTime")
                            });
                        }
                        return challenges;
                    }
                }
            }
        }

        public Challenge GetChallengeById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id AS ChallengeId,
                                        GroupId,
                                        Title AS ChallengeTitle,
                                        [Description] AS ChallengeDescription,
                                        CreatedDateTime AS ChallengeStartDate,
                                        EndDateTime AS ChallengeEndDateTime
                                        FROM [Challenge] 
                                    WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Challenge challenge = new Challenge()
                            {
                                Id = DbUtils.GetInt(reader, "ChallengeId"),
                                GroupId = DbUtils.GetInt(reader, "GroupId"),
                                Title = DbUtils.GetString(reader, "ChallengeTitle"),
                                Description = DbUtils.GetString(reader, "ChallengeDescription"),
                                CreatedDateTime = DbUtils.GetDateTime(reader, "ChallengeStartDate"),
                                EndDateTime = DbUtils.GetDateTime(reader, "ChallengeEndDateTime")
                            };
                            return challenge;
                        }
                        return null;
                    }
                }
            }
        }

        public void Add(Challenge challenge)
        {
            //set creation date time to current date and time
            challenge.CreatedDateTime = System.DateTime.Now;
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Challenge (Title, Description, CreatedDateTime, EndDateTime, GroupId)
                                OUTPUT INSERTED.ID
                                VALUES (@title, @description, @createdDateTime, @endDateTime, @groupId);";
                    cmd.Parameters.AddWithValue("@title", challenge.Title);
                    cmd.Parameters.AddWithValue("@description", challenge.Description);
                    cmd.Parameters.AddWithValue("@createdDateTime", challenge.CreatedDateTime);
                    cmd.Parameters.AddWithValue("@endDateTime", challenge.EndDateTime);
                    cmd.Parameters.AddWithValue("@groupId", challenge.GroupId);
                    challenge.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Challenge challenge)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Challenge
                                SET Title = @title,
                                    Description = @description,
                                    EndDateTime = @endDateTime
                                WHERE Id = @id;";
                    cmd.Parameters.AddWithValue("@id", challenge.Id);
                    cmd.Parameters.AddWithValue("@title", challenge.Title);
                    cmd.Parameters.AddWithValue("@description", challenge.Description);
                    cmd.Parameters.AddWithValue("@endDateTime", challenge.EndDateTime);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }

}
