using HealthLink.Models;
using System.Collections.Generic;

namespace HealthLink.Repositories
{
    public interface IChallengeRepository
    {
        List<Challenge> GetChallengesByGroupId(int groupId);
    }
}
