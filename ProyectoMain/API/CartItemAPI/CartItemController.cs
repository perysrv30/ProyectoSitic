using System;
using DAO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using VO;
using BLL;
using System.Runtime.InteropServices;

namespace CarItemAPI
{
    [Route("CartItem/[action]")]
    [ApiController]
    public class CartItemController : ControllerBase
    {
        #region Variables & properties
        private readonly DAOClass _dao;
        private readonly ILogger<CartItemController> _logger;

        private DAOClass Dao { get { return _dao; } }
        #endregion

        #region Construct
        public CartItemController(ILogger<CartItemController> logger)
        {
            _dao = new();
            _logger = logger;
        }
        #endregion

        #region Endpoints
        [HttpGet]
        public ActionResult<CartItemResponse> GetByIdCart(int id)
        {
            CartItemResponse response = new();

            try
            {
                response.CartItem = new BLL.CartItemBLL(Dao).GetByIdCart(id);
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en CartItemController {nameof(GetByIdCart)}: ${ex.Message}");
            }

            return response;
        }

        #region DML (Insert, Update, Delete)
        [HttpPost]
        public ActionResult<CartItemResponse> Insert(CartItemRequest request)
        {
            CartItemResponse response = new();

            try
            {
                response.IsSucess = new BLL.CartItemBLL(Dao).ExecuteDBAction(eDbAction.Insert, request.CartItem);
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en CartItemController {nameof(Insert)}: ${ex.Message}");
            }

            return response;
        }

        [HttpPut]
        public ActionResult<CartItemResponse> Update(CartItemRequest request)
        {
            CartItemResponse response = new();

            try
            {
                response.IsSucess = new BLL.CartItemBLL(Dao).ExecuteDBAction(eDbAction.Update, request.CartItem);
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en CartItemController {nameof(Update)}: ${ex.Message}");
            }

            return response;
        }
        #endregion

        #endregion
    }
}
