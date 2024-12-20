-- Author:		Esperanza Romero
-- Description:	Obtiene un CartItem por un Idcart
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Cart_Items].[GetByIdObj]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Cart_Items].GetByIdObj
GO
CREATE PROCEDURE [Cart_Items].GetByIdObj
	@IdObj			INT
WITH  ENCRYPTION  
AS 
BEGIN	
	SELECT	Id				AS 'Id', 
			Cart_Id			AS 'CartId',  
			Product_Id		AS 'ProductId',  
			Quantity		AS 'Quantity', 
			Price			AS 'Price',  
			Created_At		AS 'CreatedAt', 
			Updated_At		AS 'UpdatedAt' 
	FROM Cart_Items
	WHERE Cart_Id = @IdObj
END
GO
EXEC sp_recompile N'[Cart_Items].[GetByIdObj]';
GO

Exec [Cart_Items].GetByIdObj 1