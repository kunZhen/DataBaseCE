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
    public class UpdateDataRequest
    {
        public string XmlName { get; set; }
        public string Attributes { get; set; }
        public string Conditions { get; set; }
        public bool Confirmation { get; set; }
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
        public IActionResult AgregarData([FromQuery] string request, [FromQuery] string Lista)
        {
            XmlManager xmlrequest = new XmlManager();
            xmlrequest.AgregarDatosXml(request, Lista);
            return Ok();
        }



        [HttpGet("DeleteData")]
        public IActionResult Delete([FromQuery] string xmlName, [FromQuery] string conditions, [FromQuery] bool confirmation)
        {
            XmlManager xmlM = new XmlManager();
            List<List<string>> datos = xmlM.DeleteFromXml(xmlName, conditions, confirmation);
            return Ok(datos);
        }



        [HttpPost("UpdateData")]
        public IActionResult UpdateData([FromBody] UpdateDataRequest data)
        {
            XmlManager xmlM = new XmlManager();
            List<List<string>> datos = xmlM.UpdateXml(data.XmlName, data.Attributes, data.Conditions, data.Confirmation);
            return Ok(datos);
        }



        [HttpPost("CreateUser")]
        public IActionResult CreateUser([FromQuery] string username, [FromQuery] string password)
        {
            UserManager.SaveCompressedPassword(username, password);
            return Ok();
        }



        [HttpGet("Login")]
        public IActionResult Loginr([FromQuery] string username, [FromQuery] string password)
        {
            bool passwordsMatch = UserManager.CheckCompressedPassword(username, password);

            return Ok(passwordsMatch);
        }



    }

}   



