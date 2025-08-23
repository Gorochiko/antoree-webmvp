import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Filter, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState,useMemo } from "react";
import type {Teacher}  from "@/types/teacher.type";
import { TEACHERS } from "@/mock/teacher.mock";


interface Filters {
  country: string;
  specialty: string;
  minRating: number;
  maxPrice: number;
}

const MAX_PRICE = 500000;

const RATING_OPTIONS = [
  { value: 0, label: "Tất cả đánh giá" },
  { value: 4.5, label: "4.5 sao trở lên" },
  { value: 4.7, label: "4.7 sao trở lên" },
  { value: 4.9, label: "4.9 sao trở lên" },
];

const PRICE_OPTIONS = [
  { value: MAX_PRICE, label: "Tất cả mức giá" },
  { value: 250000, label: "Dưới 250.000đ" },
  { value: 300000, label: "Dưới 300.000đ" },
  { value: 350000, label: "Dưới 350.000đ" },
];

// Helper functions
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
};

const getUniqueValues = <T,>(items: T[], key: keyof T): T[keyof T][] => {
  return [...new Set(items.map(item => item[key]))];
};

// TeacherCard component
interface TeacherCardProps {
  teacher: Teacher;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => (
  <Card className="bg-card hover:shadow-lg transition-shadow h-full flex flex-col">
    <CardContent className="p-6 flex-grow">
      <div className="flex flex-col items-center text-center mb-4">
        <img
          src={teacher.avatar || "/placeholder.svg"}
          alt={teacher.name}
          className="w-20 h-20 rounded-full mb-3 object-cover"
        />
        <h3 className="font-semibold text-lg text-card-foreground mb-1">{teacher.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <MapPin className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{teacher.country}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1 mb-3">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium text-sm">{teacher.rating}</span>
        <span className="text-sm text-muted-foreground">({teacher.reviews})</span>
      </div>

      <div className="flex flex-wrap gap-1 justify-center mb-3">
        {teacher.specialties.map((specialty) => (
          <Badge key={specialty} variant="secondary" className="text-xs">
            {specialty}
          </Badge>
        ))}
      </div>

      <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-2">
        {teacher.description}
      </p>

      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{teacher.experience}</span>
      </div>

      <div className="text-center mb-4">
        <span className="text-lg font-bold text-primary">{formatPrice(teacher.price)}</span>
        <span className="text-sm text-muted-foreground">/buổi</span>
      </div>
    </CardContent>

    <CardFooter className="p-6 pt-0">
      <Link to={`/teachers/${teacher.id}`} className="w-full">
        <Button className="w-full bg-primary hover:bg-primary/90">Xem chi tiết</Button>
      </Link>
    </CardFooter>
  </Card>
);

// FilterPanel component
interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string | number) => void;
  onResetFilters: () => void;
  countries: string[];
  specialties: string[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  countries,
  specialties
}) => (
  <div className="bg-card border rounded-lg p-6 mb-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Bộ lọc giáo viên</h2>
      <Button variant="ghost" size="sm" onClick={onResetFilters} className="flex items-center gap-1">
        <X className="h-4 w-4" />
        Đặt lại
      </Button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Quốc gia</label>
        <select 
          value={filters.country} 
          onChange={(e) => onFilterChange('country', e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Tất cả quốc gia</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">Chuyên môn</label>
        <select 
          value={filters.specialty} 
          onChange={(e) => onFilterChange('specialty', e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Tất cả chuyên môn</option>
          {specialties.map(specialty => (
            <option key={specialty} value={specialty}>{specialty}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">Đánh giá tối thiểu</label>
        <select 
          value={filters.minRating} 
          onChange={(e) => onFilterChange('minRating', Number(e.target.value))}
          className="w-full p-2 border rounded-md"
        >
          {RATING_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">Giá tối đa</label>
        <select 
          value={filters.maxPrice} 
          onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
          className="w-full p-2 border rounded-md"
        >
          {PRICE_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  </div>
);

// Main component
export function TeacherList() {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    country: "",
    specialty: "",
    minRating: 0,
    maxPrice: MAX_PRICE,
  });

  const countries = useMemo(
    () => getUniqueValues(TEACHERS, 'country').filter((c): c is string => typeof c === "string" && c !== undefined),
    []
  );
  const specialties = useMemo(() => {
    const allSpecialties = TEACHERS.flatMap(teacher => teacher.specialties);
    return [...new Set(allSpecialties)];
  }, []);
  
  const filteredTeachers = useMemo(() => {
    return TEACHERS.filter(teacher => {
      return (
        (!filters.country || teacher.country === filters.country) &&
        (!filters.specialty || teacher.specialties.includes(filters.specialty)) &&
        teacher.rating >= filters.minRating &&
        teacher.price <= filters.maxPrice
      );
    });
  }, [filters]);

  const handleFilterChange = (key: keyof Filters, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      country: "",
      specialty: "",
      minRating: 0,
      maxPrice: MAX_PRICE,
    });
  };

  return (
    <div className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Danh sách giáo viên</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Khám phá đội ngũ giáo viên chuyên nghiệp với kinh nghiệm giảng dạy phong phú
          </p>
        </div>

        <div className="mb-6 flex justify-center">
          <Button 
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Ẩn bộ lọc" : "Hiển thị bộ lọc"}
          </Button>
        </div>

        {showFilters && (
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
            countries={countries}
            specialties={specialties}
          />
        )}

        <div className="mb-6">
          <p className="text-muted-foreground">
            Tìm thấy <span className="font-semibold">{filteredTeachers.length}</span> giáo viên phù hợp
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Không tìm thấy giáo viên nào phù hợp với bộ lọc</p>
              <Button variant="outline" onClick={resetFilters} className="mt-4">
                Đặt lại bộ lọc
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}