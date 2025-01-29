import { createCanvas } from "canvas";
import { writeFileSync } from "fs";
import { join } from "path";

// Function : Generate Default Color
const defaultBGcolorFN = (): string => {

    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);

    return `rgb(${red}, ${green}, ${blue})`;
}

// Function : Generate Default Image For User
const defaultUserImgFN = (username: string): string => {

    const firstLatter = username[0].toUpperCase();
    const width = 500;
    const height = 500;

    // Create New Canvas
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Set The Background Color
    ctx.fillStyle = defaultBGcolorFN();
    ctx.fillRect(0, 0, width, height);

    // Set The Text Properties
    ctx.font = "200px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw The Text In Canvas
    ctx.fillText(firstLatter, width / 2, height / 2);

    // Save The Image
    const fileName = username.replaceAll(" ", "-") + "-" + Date.now() + ".png";
    const filePath = join(__dirname, "../../assets/users", fileName);
    const buffer = canvas.toBuffer("image/png");
    writeFileSync(filePath, buffer);

    return fileName;

}

export { defaultUserImgFN }