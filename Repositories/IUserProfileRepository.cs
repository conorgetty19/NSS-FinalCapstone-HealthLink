using HealthLink.Models;
using System.Collections.Generic;

namespace HealthLink.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetById(int id);
        UserProfile GetByEmail(string email);
        List<UserProfile> GetUsers();
        void Update(UserProfile userProfile);
    }
}