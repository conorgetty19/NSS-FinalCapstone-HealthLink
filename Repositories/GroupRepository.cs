using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using HealthLink.Models;
using HealthLink.Utils;

namespace HealthLink.Repositories
{
    public class GroupRepository : BaseRepository, IGroupRepository
    {
        public GroupRepository(IConfiguration configuration) : base(configuration) { }

        public List<Group> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = baseQuery;
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var groups = new List<Group>();
                        while (reader.Read())
                        {
                            groups.Add(NewGroup(reader));
                        }
                        return groups;
                    }
                }
            }
        }

        string baseQuery = @"SELECT Id, LeaderUserProfileId, Title, CreatedDateTime, Active FROM [Group]";

        private Group NewGroup(SqlDataReader reader)
        {
            return new Group()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                LeadUserProfileId = DbUtils.GetInt(reader, "LeaderUserProfileId"),
                Title = DbUtils.GetString(reader, "Title"),
                CreatedDateTime = DbUtils.GetDateTime(reader, "CreatedDateTime"),
                Active = DbUtils.GetBool(reader, "Active")
                //LeadUserProfile = 
            };
        }

    }
}
