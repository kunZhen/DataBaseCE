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
        [HttpGet("GetAllData")]
        public IActionResult GetAllData([FromQuery] string xmlName)
        {
            XmlManager xmlM= new XmlManager();

            List<List<string>> datos = xmlM.LeerXml(xmlName);

            return Ok(datos);
        }

        [HttpGet("GetSomeData")]
        public IActionResult GetSomeData([FromQuery] string xmlName, string atributes, string conditions)
        {
            XmlManager xmlM= new XmlManager();
            Console.WriteLine(xmlName);
            Console.WriteLine(atributes);
            Console.WriteLine(conditions);

            List<List<string>> datos = xmlM.SelectFromXml(xmlName, atributes, conditions);
            for (int i = 0; i < datos.Count; i++)
            {
                Console.WriteLine(string.Join("\t", datos[i]));
            }

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



