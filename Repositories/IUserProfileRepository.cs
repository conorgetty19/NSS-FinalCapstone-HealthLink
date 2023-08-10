﻿using HealthLink.Models;
using System.Collections.Generic;

namespace HealthLink.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetById(int id);
        UserProfile GetByEmail(string email);
        List<UserProfile> GetUsers();
        List<GroupUser> GetGroupMembersWithProfilesByGroupId(int groupId);
        void Update(UserProfile userProfile);
        void AddGroupUser(GroupUser groupUser);
        GroupUser GetGroupUserByBothIds(int groupId, int userId);
        GroupUser GetGroupUserById(int id);
        void DeleteGroupUser(int id);
    }
}