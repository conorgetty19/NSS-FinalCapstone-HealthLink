using HealthLink.Models;
using System.Collections.Generic;

namespace HealthLink.Repositories
{
    public interface IChallengeRepository
    {
        List<Challenge> GetChallengesByGroupId(int groupId);
        Challenge GetChallengeById(int id);
        void Add(Challenge challenge);
        void Update(Challenge challenge);
    }
}
