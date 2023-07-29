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
                                        EndDate AS ChallengeEndDate
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
                                EndDateTime = DbUtils.GetDateTime(reader, "ChallengeEndDate")
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
                                        EndDate AS ChallengeEndDate
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
                                EndDateTime = DbUtils.GetDateTime(reader, "ChallengeEndDate")
                            };
                            return challenge;
                        }
                        return null;
                    }
                }
            }
        }


    }

}
