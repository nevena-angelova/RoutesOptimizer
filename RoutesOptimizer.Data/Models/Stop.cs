namespace RoutesOptimizer.Data.Models
{
    public class Stop
    {
        public int Id { get; set; }

        public decimal Latitude { get; set; }

        public decimal Longitude { get; set; }

        public string Name { get; set; } = null!;
    }
}
