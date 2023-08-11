/*
 * BaseRepository.cs
 * 
 * This abstract class serves as the foundational component for repository classes in the HealthLink application.
 * It encapsulates common database connectivity logic using Entity Framework in the context of a .NET Web API.
 * 
 * The class defines a constructor that accepts an IConfiguration instance to retrieve the database connection string.
 * It also provides a protected property, Connection, that supplies SqlConnection instances for derived classes.
 * 
 * This class ensures a consistent and standardized approach to handling database connections across repository classes.
 */

using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace HealthLink.Repositories
{
    public abstract class BaseRepository
    {
        private readonly string _connectionString;

        public BaseRepository(IConfiguration configuration)
        {
            // Constructor that accepts an IConfiguration instance to access configuration settings
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        protected SqlConnection Connection
        {
            get
            {
                // A protected property to provide a SqlConnection instance to derived classes
                return new SqlConnection(_connectionString);
            }
        }
    }
}