-- Author:		Esperanza Romero
-- Description:	Actualiza Order Items
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Order_Items].[Update]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Order_Items].[Update]
GO
CREATE PROCEDURE [Order_Items].[Update]
	@Id				INT,
	@OrderId		INT,
	@ProductId		INT,
	@Quantity		INT, 
	@Price			DECIMAL(18,2)
WITH  ENCRYPTION  
AS 
BEGIN	
	UPDATE Order_Items 
	SET  Order_Id = @OrderId, 
		 Product_Id  = @ProductId,
		 Quantity = @Quantity, 
		 Price = @Price	
	WHERE Id = @Id
END
GO
EXEC sp_recompile N'[Order_Items].[Update]';
GO