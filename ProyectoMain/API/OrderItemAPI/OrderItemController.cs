using System;
using DAO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using VO;

namespace OrderItemAPI
{
    [Route("OrderItem/[action]")]
    [ApiController]
    public class OrderItemController : ControllerBase
    {
        #region Variables & properties
        private readonly DAOClass _dao;
        private readonly ILogger<OrderItemController> _logger;

        private DAOClass Dao { get { return _dao; } }
        #endregion

        #region Construct
        public OrderItemController(ILogger<OrderItemController> logger)
        {
            _dao = new();
            _logger = logger;
        }
        #endregion

        #region Endpoints
        [HttpGet]
        public ActionResult<OrderItemResponse> GetById(int id)
        {
            OrderItemResponse response = new();

            try
            {
                response.OrderItem = new BLL.OrderItemBLL(Dao).GetById(id);
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en OrderItemController {nameof(GetById)}: ${ex.Message}");
            }

            return response;
        }

        [HttpGet]
        public ActionResult<OrderItemResponse> GetAll()
        {
            OrderItemResponse response = new();

            try
            {
                response.OrderItems = new BLL.OrderItemBLL(Dao).GetAll();
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en OrderItemController {nameof(GetAll)}: ${ex.Message}");
            }

            return response;
        }

        #region DML (Insert, Update, Delete)
        [HttpPost]
        public ActionResult<OrderItemResponse> Insert(OrderItemRequest request)
        {
            OrderItemResponse response = new();

            try
            {
                response.IsSucess = new BLL.OrderItemBLL(Dao).ExecuteDBAction(eDbAction.Insert, request.OrderItem);
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en OrderItemController {nameof(Insert)}: ${ex.Message}");
            }

            return response;
        }

        [HttpPut]
        public ActionResult<OrderItemResponse> Update(OrderItemRequest request)
        {
            OrderItemResponse response = new();

            try
            {
                response.IsSucess = new BLL.OrderItemBLL(Dao).ExecuteDBAction(eDbAction.Update, request.OrderItem);
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en OrderItemController {nameof(Update)}: ${ex.Message}");
            }

            return response;
        }

        [HttpDelete]
        public ActionResult<OrderItemResponse> Delete(int id)
        {
            OrderItemResponse response = new();

            try
            {
                response.IsSucess = new BLL.OrderItemBLL(Dao).ExecuteDBAction(eDbAction.Delete, new() { Id = id });
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en OrderItemController {nameof(Delete)}: ${ex.Message}");
            }

            return response;
        }
        #endregion

        #endregion
    }
}
