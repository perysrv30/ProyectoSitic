using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace ComunAPI
{
    [Route("Comun/[controller]")]
    [ApiController]
    public class ComunController : ControllerBase
    {
        private readonly string _uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

        public ComunController()
        {
            // Crear el directorio si no existe
            if (!Directory.Exists(_uploadPath))
            {
                Directory.CreateDirectory(_uploadPath);
            }
        }

        [HttpPost("upload")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            // Crear un nombre único para el archivo
            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

            // Ruta completa donde se guardará el archivo
            var filePath = Path.Combine(_uploadPath, uniqueFileName);

            // Guardar el archivo en el servidor
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // La URL relativa que se devolverá (para ser almacenada en la base de datos)
            var fileUrl = "/uploads/" + uniqueFileName;

            // Aquí puedes llamar a tu servicio para guardar la URL en la base de datos
            // Ejemplo: GuardarRutaDeImagenEnDB(fileUrl);

            return Ok(new { FilePath = fileUrl });
        }
    }

}
