/*
    IGroupRepository.cs

    This file defines the IGroupRepository interface, which outlines the contract for interacting
    with group data in the database. It specifies the methods that classes implementing this
    interface should provide, enabling CRUD (Create, Read, Update, Delete) operations on group entities.

*/

using HealthLink.Models;
using System.Collections.Generic;

namespace HealthLink.Repositories
{
    public interface IGroupRepository
    {
        List<Group> GetAll();
        List<Group> GetAllActive();
        List<Group> GetAllGroupsByMemberId(int userId);
        Group GetGroupById(int groupId);
        void Add(Group group);
        void Update(Group group);
    }
}
