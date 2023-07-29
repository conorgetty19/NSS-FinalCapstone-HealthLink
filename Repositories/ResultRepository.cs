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
                                            gu.UserProfileId,
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
                        List<Result > results = new List<Result>();
                        while(reader.Read())
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
                                    UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
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
    }
}
