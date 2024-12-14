using DAO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using VO;
using BLL;

namespace OrderAPI
{
    [Route("Order/[action]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        #region Variables & properties
        private readonly DAOClass _dao;
        private readonly ILogger<OrderController> _logger;

        private DAOClass Dao { get { return _dao; } }
        #endregion

        #region Construct
        public OrderController(ILogger<OrderController> logger)
        {
            _dao = new();
            _logger = logger;
        }
        #endregion

        #region Endpoints
        [HttpGet]
        public ActionResult<OrderResponse> GetById(int id)
        {
            OrderResponse response = new();

            try
            {
                response.Order = new BLL.OrderBLL(Dao).GetById(id);
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en OrderController {nameof(GetById)}: ${ex.Message}");
            }

            return response;
        }

        [HttpGet]
        public ActionResult<OrderResponse> GetAll()
        {
            OrderResponse response = new();

            try
            {
                response.Orders = new BLL.OrderBLL(Dao).GetAll();
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en OrderController {nameof(GetAll)}: ${ex.Message}");
            }

            return response;
        }

        #region DML (Insert, Update, Delete)
        [HttpPost]
        public ActionResult<OrderResponse> Insert(OrderRequest request)
        {
            OrderResponse response = new();

            try
            {
                response.IsSucess = new BLL.OrderBLL(Dao).ExecuteDBAction(eDbAction.Insert, request.Order);
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en OrderController {nameof(Insert)}: ${ex.Message}");
            }

            return response;
        }

        [HttpPut]
        public ActionResult<OrderResponse> Update(OrderRequest request)
        {
            OrderResponse response = new();

            try
            {
                response.IsSucess = new BLL.OrderBLL(Dao).ExecuteDBAction(eDbAction.Update, request.Order);
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en OrderController {nameof(Update)}: ${ex.Message}");
            }

            return response;
        }

        [HttpDelete]
        public ActionResult<OrderResponse> Delete(int id)
        {
            OrderResponse response = new();

            try
            {
                response.IsSucess = new BLL.OrderBLL(Dao).ExecuteDBAction(eDbAction.Delete, new() { Id = id });
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en OrderController {nameof(Delete)}: ${ex.Message}");
            }

            return response;
        }
        #endregion

        #endregion
    }
}
