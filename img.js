import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';

// Get the current directory of the module using import.meta.url

// Set the root folder path where images are stored, relative to the current script
// Correct the path construction by not adding an absolute path multiple times
const folderPath = '/public/assets/img';

// Function to convert an image to AVIF
const convertToAvif = async (imagePath, outputPath) => {
	try {
		// Convert image to AVIF using sharp
		await sharp(imagePath)
			.toFormat('avif')
			.toFile(outputPath);

		console.log(`Converted ${imagePath} to ${outputPath}`);
	} catch (error) {
		console.error(`Error converting ${imagePath}: ${error.message}`);
	}
};

// Function to recursively process files in directories
const processImages = async dirPath => {
	try {
		// Read all files and subdirectories in the given directory
		const files = await fs.readdir(dirPath);

		for (const file of files) {
			const filePath = path.join(dirPath, file);

			const stat = await fs.stat(filePath);
			if (stat.isDirectory()) {
				// Recursively process subdirectory
				await processImages(filePath);
			} else {
				// Check if the file is jpg or png
				if (
					['.avif', '.jpeg', '.avif'].includes(
						path.extname(file).toLowerCase()
					)
				) {
					const outputPath = path.join(
						dirPath,
						`${path.parse(file).name}.avif`
					);

					// Convert the image to AVIF format
					await convertToAvif(filePath, outputPath);
				}
			}
		}
	} catch (error) {
		console.error(
			`Error processing directory ${dirPath}: ${error.message}`
		);
	}
};

// Start processing images in the root folder
processImages(folderPath).catch(error => {
	console.error('Error processing images:', error.message);
});
