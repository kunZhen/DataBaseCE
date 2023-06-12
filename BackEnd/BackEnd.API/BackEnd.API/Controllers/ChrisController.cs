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
  
        [HttpGet("GetData")]
        public IActionResult GetData([FromQuery] string xmlName, string atributes, string conditions)
        {
            XmlManager xmlM= new XmlManager();
         

            List<List<string>> datos = xmlM.SelectFromXml(xmlName, atributes, conditions);
       

            return Ok(datos);
        }

        [HttpGet("GetSomeDataJoin")]
        public IActionResult GetSomeDataJoin([FromQuery] string xmlName, string atributes, string conditions)
        {
            XmlManager xmlM = new XmlManager();
          

            List<List<string>> datos = xmlM.SelectFromXmlJoinAndOr(xmlName, atributes, conditions);
      

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



