import axios from "axios";

export interface Gallery {
    _id: string;
    title: string;
    description: string;
  }

  export interface Image {
    _id: string;
    filename: string;
    path: string;
    galleryTitle: string;
  }
  const BASE_URL = "http://localhost:5000";
  
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

  export const updateGalleryTitle = async (id: string, title: string): Promise<void> => {
    try {
      await axios.put(`${BASE_URL}/editGallery/${id}`, { title });
    } catch (error) {
      console.error("Error updating gallery title:", error);
      throw error;
    }
  };

  export const uploadImage = async (galleryTitle: string, files: File[]): Promise<void> => {
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append("images", file);
      });
      formData.append("galleryTitle", galleryTitle);
  
      const response = await axios.post(`${BASE_URL}/uploadImages`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.status !== 200) {
        throw new Error("Failed to upload images");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    }
  };

  export const fetchImagesByGalleryTitle = async (galleryTitle: string): Promise<Image[]> => {
    try {
      const response = await fetch(`${BASE_URL}/images/${galleryTitle}`);
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const data: Image[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching images:", error);
      throw error;
    }
  };
  
  // Fetch a specific image by filename
  export const fetchImageByFilename = async (filename: string): Promise<Blob> => {
    try {
      const response = await axios.get(`${BASE_URL}/image/${filename}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching image:", error);
      throw error;
    }
  };

  export const fetchImagesByGalleryID = async (galleryID: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/imagesByGallery/${galleryID}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching images by gallery ID:", error);
      throw error;
    }
  };

  export const deleteImages = async (imageIds: string[]): Promise<void> => {
    try {
      const response = await axios.delete(`${BASE_URL}/deleteImages`, {
        data: { ids: imageIds }
      });
      if (response.status !== 200) {
        throw new Error("Failed to delete images");
      }
    } catch (error) {
      console.error("Error deleting images:", error);
      throw error;
    }
  };