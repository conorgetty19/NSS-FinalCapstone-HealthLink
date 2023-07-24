using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using HealthLink.Models;
using HealthLink.Utils;

namespace HealthLink.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = baseQuery + @"WHERE FirebaseUserId = @FirebaseUserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = NewUserProfile(reader);
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public UserProfile GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = baseQuery + @" WHERE up.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = NewUserProfile(reader);
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public List<UserProfile> GetUsers()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = baseQuery + @"ORDER BY up.Username";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var users = new List<UserProfile>();
                        while (reader.Read())
                        {
                            users.Add(NewUserProfile(reader));
                        }
                        return users;
                    }
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, Username, FullName, 
                                                                 Email, CreatedDateTime, ImageUrl)
                                        OUTPUT INSERTED.ID
                                        VALUES (@firebaseUserId, @username, @fullName, 
                                                @email, @createdDateTime, @imageUrl)";
                    DbUtils.AddParameter(cmd, "@firebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@username", userProfile.Username);
                    DbUtils.AddParameter(cmd, "@fullName", userProfile.FullName);
                    DbUtils.AddParameter(cmd, "@email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@createdDateTime", userProfile.CreatedDateTime);
                    DbUtils.AddParameter(cmd, "@imageUrl", userProfile.ImageUrl);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE UserProfile
                                        SET Username = @username,
                                            FullName = @fullName,
                                            Email = @email,
                                            ImageUrl = @imageUrl
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@username", userProfile.Username);
                    DbUtils.AddParameter(cmd, "@fullName", userProfile.FullName);
                    DbUtils.AddParameter(cmd, "@email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@imageUrl", userProfile.ImageUrl);
                    DbUtils.AddParameter(cmd, "@id", userProfile.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        /*
        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
                       .Include(up => up.UserType) 
                       .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }
        */

        string baseQuery = @"SELECT up.Id, Up.FirebaseUserId, up.FullName, up.Username, 
                               up.Email, up.CreatedDateTime, up.ImageUrl
                          FROM UserProfile up

";

        private UserProfile NewUserProfile(SqlDataReader reader)
        {
            return new UserProfile()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                FullName = DbUtils.GetString(reader, "FullName"),
                Username = DbUtils.GetString(reader, "Username"),
                Email = DbUtils.GetString(reader, "Email"),
                CreatedDateTime = DbUtils.GetDateTime(reader, "CreatedDateTime"),
                ImageUrl = DbUtils.GetString(reader, "ImageUrl")
            };
        }
    }
}
