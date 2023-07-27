using HealthLink.Models;
using System.Collections.Generic;

namespace HealthLink.Repositories
{
    public interface IGroupRepository
    {
        List<Group> GetAll();
        List<Group> GetAllActive();
        List<Group> GetAllGroupsByMemberId(int userId);
        void Add(Group group);
    }
}
