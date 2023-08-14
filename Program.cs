/*
    Program.cs

    This file contains the entry point for the HealthLink ASP.NET Core application.
    It defines the `Main` method and the `CreateHostBuilder` method, which are used
    to configure and start the application.

*/
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace HealthLink
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
