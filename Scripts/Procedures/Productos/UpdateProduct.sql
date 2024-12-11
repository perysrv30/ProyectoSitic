-- Author:		Esperanza Romero
-- Description:	Actualiza Productos
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Products].[Update]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Products].[Update]
GO
CREATE PROCEDURE [Products].[Update]
	@Id				INT,
	@Name			VARCHAR(255),
	@Description	TEXT,
	@Price			DECIMAL(18,2), 
	@CurrentStock	INT,
	@MaxStock		INT, 
	@MinStock		INT, 
	@Imagepath		VARCHAR(255)
WITH  ENCRYPTION  
AS 
BEGIN	
	UPDATE Products 
	SET Name = @Name, 
		Description = @Description,
		Price = @Price,
		Current_Stock = @CurrentStock,
		Max_Stock = @MaxStock,
		Min_Stock = @MinStock,
		Image_Path = @Imagepath
	WHERE Id = @Id
END
GO
EXEC sp_recompile N'[Products].[Update]';
GO