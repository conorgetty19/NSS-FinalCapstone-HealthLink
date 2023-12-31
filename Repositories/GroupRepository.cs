﻿/*
    GroupRepository.cs

    This file defines the GroupRepository class, responsible for interacting with the database
    to perform CRUD (Create, Read, Update, Delete) operations related to group entities.

    The GroupRepository class extends the BaseRepository class, which provides the common database
    connection functionality. It implements the IGroupRepository interface, which outlines the
    contract for interacting with group data.

*/

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

        //retrieves all groups REGARDLESS of active or inactive status
        //(currently defined by leadership or lack thereof)
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
                            Group group = FindGroupInList(groups, reader);
                            if (group == null)
                            {
                                group = NewGroup(reader);
                                groups.Add(group);
                            }
                        }
                        return groups;
                    }
                }
            }
        }
        //retrieves a list of active groups (currently defined by presence of a leader)
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
                            Group group = FindGroupInList(groups, reader);
                            if (group == null)
                            {
                                group = NewGroup(reader);
                                groups.Add(group);
                            }
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

                        WHERE gu.[UserProfileId] = @userId;";
                    cmd.Parameters.AddWithValue("@userId", userId);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var groups = new List<Group>();
                        while (reader.Read())
                        {
                            Group group = FindGroupInList(groups, reader);
                            if (group == null)
                            {
                                group = NewGroup(reader);
                                groups.Add(group);
                            }
                        }
                        return groups;
                    }
                }
            }
        }

        public Group GetGroupById(int groupId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT " + baseQueryWithoutSelect + " WHERE g.Id = @groupId";
                    cmd.Parameters.AddWithValue("@groupId", groupId);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return NewGroup(reader);
                        }
                        return null; 
                    }
                }
            }
        }


        public void Add(Group group)
        {
            group.CreatedDateTime = System.DateTime.Now;
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [Group]
                                        (LeaderUserProfileId, Title, [Description], ImageUrl, CreatedDateTime)
                                        OUTPUT INSERTED.ID
                                        VALUES (@leaderUserProfileId, @title, @description, @imageUrl, @createdDateTime)";
                    cmd.Parameters.AddWithValue("@leaderUserProfileId", group.LeadUserProfileId);
                    cmd.Parameters.AddWithValue("@title", group.Title);
                    cmd.Parameters.AddWithValue("@description", group.Description);
                    cmd.Parameters.AddWithValue("@imageUrl", group.ImageUrl);
                    cmd.Parameters.AddWithValue("@createdDateTime", group.CreatedDateTime);
                    group.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Group group)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE [Group] 
                                SET LeaderUserProfileId = @leaderUserProfileId,
                                    Title = @title,
                                    [Description] = @description,
                                    ImageUrl = @imageUrl
                                WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", group.Id);
                    cmd.Parameters.AddWithValue("@leaderUserProfileId", group.LeadUserProfileId);
                    cmd.Parameters.AddWithValue("@title", group.Title);
                    cmd.Parameters.AddWithValue("@description", group.Description);
                    cmd.Parameters.AddWithValue("@imageUrl", group.ImageUrl);

                    cmd.ExecuteNonQuery();
                }
            }
        }


        string baseQueryWithoutSelect = @"
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
                                        l.CreatedDateTime AS LeaderUserProfileCreatedDateTime,
                                        gu.Id AS GroupUserId,
                                        gu.UserProfileId AS GroupUserUserProfileId
                                    FROM [Group] g
                                    LEFT JOIN [UserProfile] l ON g.LeaderUserProfileId = l.Id
                                    LEFT JOIN [GroupUser] gu ON g.Id = gu.GroupId";


        string queryAllGroupsWithActiveLeader = @"
                                            SELECT 
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
                                                l.CreatedDateTime AS LeaderUserProfileCreatedDateTime,
                                                gu.Id AS GroupUserId,
                                                gu.UserProfileId AS GroupUserUserProfileId
                                            FROM [Group] g
                                            INNER JOIN [UserProfile] l ON g.LeaderUserProfileId = l.Id
                                            LEFT JOIN [GroupUser] gu ON g.Id = gu.GroupId";

        //utility method to find a match amongst a list of groups
        private Group FindGroupInList(List<Group> groups, SqlDataReader reader)
        {
            int groupId = DbUtils.GetInt(reader, "GroupId");
            return groups.Find(g => g.Id == groupId);
        }
        //utility method to create a new group object from the results of a database query
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
                Challenges = new List<Challenge>()
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
