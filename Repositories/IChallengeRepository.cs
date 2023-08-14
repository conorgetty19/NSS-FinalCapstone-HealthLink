/*
    IChallengeRepository.cs

    This file defines the interface for the ChallengeRepository class. The interface outlines the contract
    that the ChallengeRepository class must adhere to. It includes methods for retrieving challenges by group ID,
    retrieving a challenge by its ID, adding a new challenge, and updating an existing challenge in the database.

    This interface serves as a blueprint for the ChallengeRepository class, ensuring consistent method signatures.
*/

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
