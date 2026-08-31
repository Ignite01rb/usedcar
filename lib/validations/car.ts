import * as z from "zod";

export const carFormSchema = z.object({
  name: z.string().min(1, "Car brand is required"),
  model: z.string().optional(),
  year: z.string().min(1, "Year is required"),
  km_driven: z.string().min(1, "Kilometers driven is required"),
  fuel: z.string().min(1, "Fuel type is required"),
  seller_type: z.string().min(1, "Seller type is required"),
  transmission: z.string().min(1, "Transmission type is required"),
  owner: z.string().min(1, "Owner type is required"),
  mileage: z.string().min(1, "Mileage is required"),
  engine: z.string().min(1, "Engine capacity is required"),
  max_power: z.string().min(1, "Max power is required"),
});


export type CarFormValues = z.infer<typeof carFormSchema>;
