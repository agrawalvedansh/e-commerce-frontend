import { useState } from 'react'
import ProductCard from "../components/product-card.tsx"
import { useCategoriesQuery, useSearchProductsQuery } from '../redux/api/productAPI.ts';
import { server } from '../redux/store.ts';
import { Skeleton } from '../components/loader.tsx';
import { useDispatch } from 'react-redux';
import { cartItem } from '../types/types.ts';
import toast from 'react-hot-toast';
import { addToCart } from '../redux/reducer/cartReducer.ts';

const Search = () => {

  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("")

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const {
    isLoading: productLoading,
    data: searchData,
  } = useSearchProductsQuery({ search, sort, category, price: maxPrice, page })

  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: cartItem) => {
    if(cartItem.stock < 1) return toast.error("Out Of Stock!")
    toast.success("Added to cart!")
    dispatch(addToCart(cartItem))
  };
  
  const isNextPage = page < 4;
  const isPrevPage = page > 1;
  return (
    <div className="search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input type="range" min={100} max={100000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
        </div>

        <div>
          <h4>Category</h4>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            {
              !loadingCategories && categoriesResponse?.categories.map((i) =>
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              )
            }

          </select>

        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input type="text" placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} />

        {
          productLoading ? (
            <Skeleton />) : (
            <div className="search-product-list">
              {
                searchData?.products.map((i) => (
                  <ProductCard
                    key={i._id}
                    productId={i._id}
                    name={i.name}
                    price={i.price}
                    stock={i.stock}
                    handler={addToCartHandler}
                    photo={`${server}/${i.photo}`}
                  />
                ))
              }
            </div>
          )
        }

        {
          searchData && searchData.totalPage > 1 && (
            <article>
              <button disabled={!isPrevPage} onClick={() => setPage((prev) => prev - 1)}>Prev</button>
              <span>{page} of {searchData.totalPage}</span>
              <button disabled={!isNextPage} onClick={() => setPage((prev) => prev + 1)}>Next</button>
            </article>
          )
        }

      </main>
    </div>
  )
}

export default Search