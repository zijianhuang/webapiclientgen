using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;

namespace DemoWebApi.Controllers
{
    public class AsyncDemoController : ApiController
    {
        [HttpGet]
        [Route("int")]
        public async Task<int> GetIntSquareAsync(int d)//some shops might have strict style guid to name async function with Async suffix always.
        {
            return await Task.Run(() =>  d * d);
        }

        [HttpGet]
        [Route("decimal")]
        public async Task<decimal> GetDecimalSquare(decimal d)
        {
            return await Task.Run(() => d * d);
        }

        [HttpGet]
        [Route("NullableDatetime")]
        public async Task<DateTime?> GetDateTime(bool hasValue)
        {
            return await Task.Run(() =>
            {
                DateTime? dt;
                if (hasValue)
                    dt = DateTime.Now;
                else
                    dt = null;

                return dt;
            });
        }

        [HttpGet]
        [Route("NullableDecimal")]
        public async Task<Decimal?> GetDecimal(bool hasValue)
        {
            return await Task.Run(() =>
            {
                Decimal? dt;
                if (hasValue)
                    dt = 1000;
                else
                    dt = null;

                return dt;
            });
        }

        [HttpGet]
        [Route("FloatZero")]
        public float GetFloatZero()
        {
            return 0.1f + 0.2f - 0.3f;
        }

        [HttpGet]
        [Route("DoubleZero")]
        public double GetDoubleZero()
        {
            return 0.1d + 0.2d - 0.3d;
        }

        [HttpGet]
        [Route("DecimalZero")]
        public decimal GetDecimalZero()
        {
            return 0.1m + 0.2m - 0.3m;
        }


    }
}
