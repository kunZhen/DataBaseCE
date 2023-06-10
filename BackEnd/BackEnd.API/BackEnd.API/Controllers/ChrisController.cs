using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Xml;


namespace BackEnd.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChrisController : Controller
    {
        [HttpGet]
        public IActionResult GetAllData()
        {
            XmlManager xmlM= new XmlManager();

            List<List<string>> datos = xmlM.LeerXml("Personas");

            return Ok(datos);
        }

        [HttpPost]
        public async Task<IActionResult> AddData(string request, List<string> Lista) 
        {
            XmlManager xmlrequest= new XmlManager();
            xmlrequest.CrearCarpetaXmlStore(request, Lista);

            return Ok();
        }

    }

}   



