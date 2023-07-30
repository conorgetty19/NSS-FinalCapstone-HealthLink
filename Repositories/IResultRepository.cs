using HealthLink.Models;
using System.Collections.Generic;

namespace HealthLink.Repositories
{
    public interface IResultRepository
    {
        List<Result> GetResultsByChallengeId(int challengeId);
        void Add(Result result);
        void Update(Result result);
        void Delete(int resultId);
        Result GetById(int id);
    }
}
