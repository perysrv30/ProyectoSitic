using System;
using DAO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using VO;
using BLL;

namespace Services
{
    [Route("Cart/[action]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        #region Variables & properties
        private readonly DAOClass _dao;
        private readonly ILogger<CartController> _logger;

        private DAOClass Dao { get { return _dao; } }
        #endregion

        #region Construct
        public CartController(ILogger<CartController> logger)
        {
            _dao = new();
            _logger = logger;
        }
        #endregion

        #region Endpoints
        [HttpGet]
        public ActionResult<CartResponse> GetById(int id)
        {
            CartResponse response = new();

            try
            {
                response.Cart = new BLL.CartBLL(Dao).GetById(id);
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en ProductController {nameof(GetById)}: ${ex.Message}");
            }

            return response;
        }

        #region DML (Insert, Update, Delete)
        [HttpPost]
        public ActionResult<CartResponse> Insert(CartResponse request)
        {
            CartResponse response = new();

            try
            {
                response.IsSucess = new BLL.CartBLL(Dao).ExecuteDBAction(eDbAction.Insert, request.Cart);
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en ProductController {nameof(Insert)}: ${ex.Message}");
            }

            return response;
        }
        #endregion

        #endregion
    }
}
