﻿using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using HealthLink.Models;
using HealthLink.Utils;
using System.Data;

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

        string baseQueryWithoutSelect = @"g.Id AS GroupId,
                               g.LeaderUserProfileId,
                               g.Title AS GroupTitle,
                               g.Description AS GroupDescription,
                               g.ImageUrl AS GroupImageUrl,
                               g.CreatedDateTime AS GroupCreatedDateTime,
                               g.Active AS GroupActive,
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
                LeadUserProfileId = DbUtils.GetInt(reader, "LeaderUserProfileId"),
                Title = DbUtils.GetString(reader, "GroupTitle"),
                Description = DbUtils.GetString(reader, "GroupDescription"),
                ImageUrl = DbUtils.GetString(reader, "GroupImageUrl"),
                CreatedDateTime = DbUtils.GetDateTime(reader, "GroupCreatedDateTime"),
                Active = DbUtils.GetBool(reader, "GroupActive"),
                LeadUserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "LeaderUserProfileId"),
                    FirebaseUserId = DbUtils.GetString(reader, "LeaderUserProfileFirebaseUserId"),
                    Username = DbUtils.GetString(reader, "LeaderUserProfileUsername"),
                    FullName = DbUtils.GetString(reader, "LeaderUserProfileFullName"),
                    ImageUrl = DbUtils.GetString(reader, "LeaderUserProfileImageUrl"),
                    Email = DbUtils.GetString(reader, "LeaderUserProfileEmail"),
                    CreatedDateTime = DbUtils.GetDateTime(reader, "LeaderUserProfileCreatedDateTime")
                }

            };
            return group;
        }

    }
}
