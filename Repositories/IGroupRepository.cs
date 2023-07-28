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
