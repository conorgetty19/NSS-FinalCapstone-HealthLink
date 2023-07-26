using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using HealthLink.Models;
using HealthLink.Utils;
using System.Data;
using Azure;

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
                    cmd.CommandText = "SELECT " + baseQueryWithoutSelect;
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

        public List<Group> GetAllActive()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = queryAllGroupsWithActiveLeader;
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

        public List<Group> GetAllGroupsByMemberId(int userId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT DISTINCT " + baseQueryWithoutSelect + @"

                        INNER JOIN [GroupUser] gu ON g.[Id] = gu.[GroupId]
                        WHERE gu.[UserProfileId] = @userId;";
                    cmd.Parameters.AddWithValue("@userId", userId);
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

        public void Add(Group group)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [Group]
                                        (LeaderUserProfileId, Title, [Description], ImageUrl, CreatedDateTime)
                                        VALUES (@leaderUserProfileId, @title, @description, @imageUrl, @createdDateTime";
                    cmd.Parameters.AddWithValue("@leaderUserProfileId", group.LeadUserProfileId);
                    cmd.Parameters.AddWithValue("@title", group.Title);
                    cmd.Parameters.AddWithValue("@description", group.Description);
                    cmd.Parameters.AddWithValue("@imageUrl", group.ImageUrl);
                    cmd.Parameters.AddWithValue("@createdDateTime", group.CreatedDateTime);
                    group.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        string baseQueryWithoutSelect = @"g.Id AS GroupId,
                               g.LeaderUserProfileId,
                               g.Title AS GroupTitle,
                               g.Description AS GroupDescription,
                               g.ImageUrl AS GroupImageUrl,
                               g.CreatedDateTime AS GroupCreatedDateTime,
                               l.Id AS LeaderUserProfileId,
                               l.FirebaseUserId AS LeaderUserProfileFirebaseUserId,
                               l.Username AS LeaderUserProfileUsername,
                               l.FullName AS LeaderUserProfileFullName,
                               l.Email AS LeaderUserProfileEmail,
                               l.ImageUrl AS LeaderUserProfileImageUrl,
                               l.CreatedDateTime AS LeaderUserProfileCreatedDateTime
                        FROM [Group] g
                        LEFT JOIN [UserProfile] l ON g.LeaderUserProfileId = l.Id";

        string queryAllGroupsWithActiveLeader = @"SELECT 
                               g.Id AS GroupId,
                               g.LeaderUserProfileId,
                               g.Title AS GroupTitle,
                               g.Description AS GroupDescription,
                               g.ImageUrl AS GroupImageUrl,
                               g.CreatedDateTime AS GroupCreatedDateTime,
                               l.Id AS LeaderUserProfileId,
                               l.FirebaseUserId AS LeaderUserProfileFirebaseUserId,
                               l.Username AS LeaderUserProfileUsername,
                               l.FullName AS LeaderUserProfileFullName,
                               l.Email AS LeaderUserProfileEmail,
                               l.ImageUrl AS LeaderUserProfileImageUrl,
                               l.CreatedDateTime AS LeaderUserProfileCreatedDateTime
                        FROM [Group] g
                        INNER JOIN [UserProfile] l ON g.LeaderUserProfileId = l.Id";

        private Group NewGroup(SqlDataReader reader)
        {
            Group group = new Group()
            {
                Id = DbUtils.GetInt(reader, "GroupId"),
                LeadUserProfileId = DbUtils.GetNullableInt(reader, "LeaderUserProfileId"),
                Title = DbUtils.GetString(reader, "GroupTitle"),
                Description = DbUtils.GetString(reader, "GroupDescription"),
                ImageUrl = DbUtils.GetString(reader, "GroupImageUrl"),
                CreatedDateTime = DbUtils.GetDateTime(reader, "GroupCreatedDateTime"),
            };

            int? leaderUserProfileId = group.LeadUserProfileId;
            if (leaderUserProfileId.HasValue)
            {
                group.LeadUserProfile = new UserProfile()
                {
                    Id = leaderUserProfileId.Value,
                    FirebaseUserId = DbUtils.GetString(reader, "LeaderUserProfileFirebaseUserId"),
                    Username = DbUtils.GetString(reader, "LeaderUserProfileUsername"),
                    FullName = DbUtils.GetString(reader, "LeaderUserProfileFullName"),
                    ImageUrl = DbUtils.GetString(reader, "LeaderUserProfileImageUrl"),
                    Email = DbUtils.GetString(reader, "LeaderUserProfileEmail"),
                    CreatedDateTime = DbUtils.GetDateTime(reader, "LeaderUserProfileCreatedDateTime")
                };
            }
            else
            {
                group.LeadUserProfile = null;
            }

            return group;
        }


    }
}
