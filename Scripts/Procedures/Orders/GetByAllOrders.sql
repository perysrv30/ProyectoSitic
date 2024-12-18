-- Author:		Esperanza Romero
-- Description:	Obtiene una lista de Ordenes
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Orders].[GetAll]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Orders].[GetAll]
GO
CREATE PROCEDURE [Orders].[GetAll]
WITH  ENCRYPTION  
AS 
BEGIN	
	SELECT	Id				AS 'Id', 
			Total_Price		AS 'TotalPrice',
			Status			AS 'Status',
			Created_At		AS 'CreatedAt', 
			Updated_At		AS 'UpdatedAt' 
	FROM Orders
END
GO
EXEC sp_recompile N'[Orders].[GetAll]';
GO