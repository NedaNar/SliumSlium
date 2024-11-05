namespace SliumSlium.Server.DTO
{
    public class ApplicantDTO
    {
        public int Id { get; set; }
        public int UserJobOfferId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int CurrentPart { get; set; }
        public string Status { get; set; }
        public string Date { get; set; }
        public string? FilePath { get; set; }
        public string? FileUploadDate { get; set; }
    }
}
