using app;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Xml;
using System.Xml.Linq;


namespace BackEnd.API.Controllers
{
    public class CreateXmlRequestModel
    {
        public string Request { get; set; }
        public List<string> Lista { get; set; }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class ChrisController : Controller
    {

        [HttpGet("GetData")]
        public IActionResult GetData([FromQuery] string xmlName, string atributes, string conditions)
        {
            XmlManager xmlM = new XmlManager();
            Console.WriteLine("prue1");

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



        [HttpPost("CreateXML")]
        public IActionResult CreateXML([FromBody] CreateXmlRequestModel model)
        {
            Console.WriteLine("prue2");
            XmlManager xmlrequest = new XmlManager();
            xmlrequest.CrearCarpetaXmlStore(model.Request, model.Lista);

            return Ok();
        }

        [HttpPost("AgregarData")]
        public IActionResult AgregarData([FromQuery] string request, string Lista)
        {
            XmlManager xmlrequest = new XmlManager();
            xmlrequest.AgregarDatosXml(request, Lista);

            return Ok();
        }

        [HttpGet("DeleteData")]
        public IActionResult Delete([FromQuery] string request, string conditions, bool confirmation)
        {
            XmlManager xmlM = new XmlManager();


            List<List<string>> datos = xmlM.DeleteFromXml(request, conditions, confirmation);


            return Ok(datos);
        }


        [HttpGet("UpdateData")]
        public IActionResult UpdateData([FromQuery] string request, string atributtes, string conditions, bool confirmation)
        {
            XmlManager xmlM = new XmlManager();


            List<List<string>> datos = xmlM.UpdateXml(request, atributtes, conditions, confirmation);


            return Ok(datos);
        }

        [HttpPost("CreateUser")]
        public IActionResult CreateUser([FromQuery] string username, string password)
        {
 
            UserManager.SaveCompressedPassword(username, password);

            return Ok();
        }

        [HttpGet("Login")]
        public IActionResult Loginr([FromQuery] string username, string password)
        {

            bool passwordsMatch = UserManager.CheckCompressedPassword(username, password);

            return Ok(passwordsMatch);
        }


    }

}   



