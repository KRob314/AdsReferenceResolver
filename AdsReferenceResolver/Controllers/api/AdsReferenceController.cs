using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace AdsReferenceResolver.Controllers.api
{
    public class AdsReferenceController : ApiController
    {
        private static Random rnd = new Random();

        [ResponseType(typeof(string))]
        public IHttpActionResult GetBibliographicReference(string citation)
        {
            string result = "";         
            List<string> bibs = new List<string>();

            bibs.Add("------------------- (confidence 0) from Mook, D., Kurtz, M., Weed, J.");
            bibs.Add("1982BICDS..23...13K (confidence 1) from Kurtz, M. J. 1982, Bulletin d'Information du Centre de Donnees Stellaires, 23, 13");
            bibs.Add("1982PhDT.........2K (confidence 1) from Kurtz, M. J. 1982, Ph.D. Thesis, 2");
            bibs.Add("------------------- (confidence 0) from Geller, M. J., Kurtz, M. J.");
            bibs.Add("1983ESASP.201...47K (confidence 2) from Kurtz, M. J. 1983, Statistical Methods in Astronomy, 47");
            bibs.Add("------------------- (confidence 0) from Kurtz, M. J., Huchra, J. P., Beers, T. C., Geller, M. J., Gioia, I. M., Maccacaro, T., Schild, R. E.");
            bibs.Add("2007MNRAS.379L..55L (confidence 1) from Li, Li-Xin, 2007,, MNRAS, 379, L55");
            bibs.Add("2013AcPol..53..687D (confidence 0) from Dichiara, S., Amati, 2013, Acta Politechnica, 53, 687");


            int index = rnd.Next(0, bibs.Count);
            result = bibs[index];

            return Ok(result);
        }
    }
}
