import axios from "axios";

export interface Gallery {
    _id: string;
    title: string;
    description: string;
  }
  
  export const fetchGalleriesData = async (): Promise<Gallery[]> => {
    try {
      const response = await fetch("http://localhost:5000/galleries");
      if (!response.ok) {
        throw new Error("Failed to fetch galleries");
      }
      const data: Gallery[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching galleries:", error);
      throw error;
    }
  };
  
  export const createGallery = async (title: string, description: string): Promise<{ message: string }> => {
    try {
      const response = await fetch("http://localhost:5000/createGallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
  
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to create gallery");
      }
      return result;
    } catch (error) {
      console.error("Error creating gallery:", error);
      throw error;
    }
  };

  export const deleteGallery = async (galleryId: string): Promise<boolean> => {
    try {
      const response = await fetch(`http://localhost:5000/deleteGallery/${galleryId}`, {
        method: "DELETE",
      });
      return response.ok;
    } catch (error) {
      console.error("Error deleting gallery:", error);
      return false;
    }
  };
  
  export const fetchGalleryById = async (id: string): Promise<Gallery> => {
    try {
      console.log(`Fetching gallery with ID: ${id}`);
      const response = await fetch(`http://localhost:5000/gallery/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch gallery");
      }
      const data: Gallery = await response.json();
      console.log("Fetched gallery data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching gallery:", error);
      throw error;
    }
  };
  const BASE_URL = "http://localhost:5000";


  export const updateGalleryTitle = async (id: string, title: string): Promise<void> => {
    try {
      await axios.put(`${BASE_URL}/editGallery/${id}`, { title });
    } catch (error) {
      console.error("Error updating gallery title:", error);
      throw error;
    }
  };