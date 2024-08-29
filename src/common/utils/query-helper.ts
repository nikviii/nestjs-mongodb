import { Model } from 'mongoose';

// Interface for common filter options
export interface FilterOptions<T> {
  search?: string;
  searchFields?: string[];
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  filter?: Partial<T>; // Type-specific filter criteria
}

// Function to dynamically build a Mongoose query
export const buildMongooseQuery = <T>(
  model: Model<any>,
  filterOptions?: FilterOptions<T>,
) => {
  const condition: any = [];
  // Search + Filter (combined)
  if (filterOptions?.search || filterOptions?.filter) {
    const searchFields = ['name', 'description']; // Example search fields
    if (filterOptions.search && searchFields.length) {
      condition.push({
        $or: searchFields.map((field) => ({
          [field]: new RegExp(filterOptions.search, 'i'),
        })),
      });
    }
    if (filterOptions.filter) condition.push(filterOptions.filter);
  }
  let query = model.find();
  if (condition.length) query = model.find({ $and: condition });

  // Sorting
  if (filterOptions?.sort && filterOptions?.order) {
    query.sort({
      [filterOptions.sort]: filterOptions.order === 'asc' ? 1 : -1,
    });
  }

  // Pagination
  if (filterOptions?.page && filterOptions?.limit) {
    query
      .skip((filterOptions.page - 1) * filterOptions.limit)
      .limit(filterOptions.limit);
  }
  return query;
};

// Function to get total count
export const getTotalCount = async <T>(
  model: Model<any>,
  filterOptions: FilterOptions<T>,
) => {
  delete filterOptions.limit;
  delete filterOptions.page;
  const query = buildMongooseQuery(model, filterOptions);
  return await query.countDocuments();
};

// Function to execute a query and get data
export const executeQuery = async <T>(
  model: Model<any>,
  filterOptions: FilterOptions<T>,
) => {
  const query = buildMongooseQuery(model, filterOptions);
  return await query.exec();
};

// Function to get paginated data
export const getPaginatedData = async <T>(
  model: Model<any>,
  filterOptions: FilterOptions<T>,
) => {
  const items = await executeQuery(model, filterOptions);
  const total = await getTotalCount(model, filterOptions);
  return { items, total };
};
