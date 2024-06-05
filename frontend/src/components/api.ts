// api.ts
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
  