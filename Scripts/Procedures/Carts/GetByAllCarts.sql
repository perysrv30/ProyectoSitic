-- Author:		Esperanza Romero
-- Description:	Obtiene una lista de Productos
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Carts].[GetByAll]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Carts].[GetByAll]
GO
CREATE PROCEDURE [Carts].[GetByAll]
WITH  ENCRYPTION  
AS 
BEGIN	
	SELECT	Id				AS 'Id', 
			Total_Price		AS 'TotalPrice',
			Created_At		AS 'CreatedAt', 
			Updated_At		AS 'UpdatedAt' 
	FROM Carts
END
GO
EXEC sp_recompile N'[Carts].[GetByAll]';
GO