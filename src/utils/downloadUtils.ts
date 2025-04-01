
import { toast } from "sonner";

// Function to simulate file download
export const downloadResource = (fileName: string, fileType = 'pdf') => {
  // In a real application, this would fetch the file from a server
  // For this simulation, we'll create a dummy download process
  
  toast.info("Preparing download...", {
    description: `${fileName} is being prepared for download.`,
    duration: 2000,
  });
  
  // Simulate network delay
  setTimeout(() => {
    try {
      // In a real application, you would use something like:
      // const response = await fetch(`/api/resources/${fileName}`);
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      
      // For simulation purposes, we'll create a dummy text content
      const dummyContent = `This is a simulated ${fileType.toUpperCase()} file for ${fileName}.\n\n` +
        `This would be the actual course content in a real application.`;
      
      // Create a blob with the dummy content
      const blob = new Blob([dummyContent], { type: `application/${fileType}` });
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      
      // Append to body, click and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(url);
      
      toast.success("Download started!", {
        description: `${fileName} should download shortly.`,
      });
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Download failed", {
        description: "There was an error downloading the file. Please try again later.",
      });
    }
  }, 1500);
};

// Function to download all resources for a course as a ZIP file
export const downloadAllResources = (courseId: string, courseTitle: string) => {
  toast.info("Preparing course resources...", {
    description: `All resources for ${courseTitle} are being prepared for download.`,
    duration: 2500,
  });
  
  // Simulate network delay
  setTimeout(() => {
    try {
      // In a real application, you would package all files into a zip here
      const dummyContent = `This is a simulated ZIP file containing all resources for the course: ${courseTitle} (ID: ${courseId})`;
      const blob = new Blob([dummyContent], { type: 'application/zip' });
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${courseTitle.replace(/\s+/g, '-').toLowerCase()}-resources.zip`);
      
      // Append to body, click and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(url);
      
      toast.success("Resources downloaded!", {
        description: `All resources for ${courseTitle} have been downloaded.`,
      });
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Download failed", {
        description: "There was an error downloading the resources. Please try again later.",
      });
    }
  }, 2000);
};
