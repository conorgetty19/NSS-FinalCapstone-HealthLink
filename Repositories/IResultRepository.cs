/*
    IResultRepository.cs

    This interface defines the contract for interacting with result data in the database.
    It declares methods to retrieve, add, update, and delete result entities. Classes
    that implement this interface are expected to provide implementations for these methods,
    enabling the application to perform CRUD (Create, Read, Update, Delete) operations on
    result entities.

*/

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
