using HealthLink.Models;
using System.Collections.Generic;

namespace HealthLink.Repositories
{
    public interface IGroupRepository
    {
        List<Group> GetAll();
    }
}
