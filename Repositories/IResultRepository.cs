using HealthLink.Models;
using System.Collections.Generic;

namespace HealthLink.Repositories
{
    public interface IResultRepository
    {
        List<Result> GetResultsByChallengeId(int challengeId);
    }
}
