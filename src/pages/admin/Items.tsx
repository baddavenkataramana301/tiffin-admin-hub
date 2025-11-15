import { useState } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// Mock data
const rawItems = [
  { id: 1, name: "Rice", unit: "kg", currentStock: 450, reorderLevel: 100, costPerUnit: 45, status: "good" },
  { id: 2, name: "Urad Dal", unit: "kg", currentStock: 85, reorderLevel: 50, costPerUnit: 120, status: "good" },
  { id: 3, name: "Potatoes", unit: "kg", currentStock: 35, reorderLevel: 100, costPerUnit: 30, status: "low" },
  { id: 4, name: "Onions", unit: "kg", currentStock: 28, reorderLevel: 80, costPerUnit: 25, status: "critical" },
];

const semiCookedItems = [
  { id: 1, name: "Rice Batter", unit: "kg", shelfLife: "24 hrs", currentStock: 45, recipe: "Rice, Urad Dal, Water" },
  { id: 2, name: "Coconut Chutney", unit: "kg", shelfLife: "12 hrs", currentStock: 22, recipe: "Coconut, Green Chili, Ginger" },
  { id: 3, name: "Sambar Base", unit: "L", shelfLife: "48 hrs", currentStock: 38, recipe: "Toor Dal, Tamarind, Spices" },
];

const Items = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemUnit, setNewItemUnit] = useState("");

  const handleAddItem = () => {
    if (newItemName && newItemUnit) {
      toast.success(`Added ${newItemName} successfully!`);
      setIsAddDialogOpen(false);
      setNewItemName("");
      setNewItemUnit("");
    } else {
      toast.error("Please fill all required fields");
    }
  };

  const rawColumns = [
    { key: "name", label: "Item Name" },
    { key: "unit", label: "Unit" },
    { 
      key: "currentStock", 
      label: "Current Stock",
      render: (item: any) => (
        <span className="font-medium">{item.currentStock} {item.unit}</span>
      )
    },
    { 
      key: "reorderLevel", 
      label: "Reorder Level",
      render: (item: any) => (
        <span className="text-muted-foreground">{item.reorderLevel} {item.unit}</span>
      )
    },
    { 
      key: "costPerUnit", 
      label: "Cost/Unit",
      render: (item: any) => <span>₹{item.costPerUnit}</span>
    },
    {
      key: "status",
      label: "Status",
      render: (item: any) => (
        <Badge 
          variant={
            item.status === "good" ? "default" : 
            item.status === "low" ? "secondary" : 
            "destructive"
          }
          className={
            item.status === "good" ? "bg-success text-success-foreground" : ""
          }
        >
          {item.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: () => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const semiCookedColumns = [
    { key: "name", label: "Item Name" },
    { key: "unit", label: "Unit" },
    { key: "shelfLife", label: "Shelf Life" },
    { 
      key: "currentStock", 
      label: "Current Stock",
      render: (item: any) => (
        <span className="font-medium">{item.currentStock} {item.unit}</span>
      )
    },
    { 
      key: "recipe", 
      label: "Recipe (BOM)",
      render: (item: any) => (
        <span className="text-sm text-muted-foreground">{item.recipe}</span>
      )
    },
    {
      key: "actions",
      label: "Actions",
      render: () => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Items & Recipes</h1>
          <p className="text-muted-foreground">Manage inventory and recipe configurations</p>
        </div>
      </div>

      <Tabs defaultValue="raw" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="raw">Raw Items</TabsTrigger>
            <TabsTrigger value="semi">Semi-Cooked</TabsTrigger>
            <TabsTrigger value="cooked">Cooked</TabsTrigger>
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter item name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={newItemUnit} onValueChange={setNewItemUnit}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilogram (kg)</SelectItem>
                      <SelectItem value="g">Gram (g)</SelectItem>
                      <SelectItem value="L">Liter (L)</SelectItem>
                      <SelectItem value="ml">Milliliter (ml)</SelectItem>
                      <SelectItem value="pcs">Pieces (pcs)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Initial Stock</Label>
                    <Input id="stock" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reorder">Reorder Level</Label>
                    <Input id="reorder" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Cost per Unit (₹)</Label>
                  <Input id="cost" type="number" placeholder="0.00" />
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddItem}>Add Item</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="raw" className="space-y-4">
          <DataTable
            data={rawItems}
            columns={rawColumns}
          />
        </TabsContent>

        <TabsContent value="semi" className="space-y-4">
          <DataTable
            data={semiCookedItems}
            columns={semiCookedColumns}
          />
        </TabsContent>

        <TabsContent value="cooked" className="space-y-4">
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            No cooked items configured yet
          </div>
        </TabsContent>

        <TabsContent value="recipes" className="space-y-4">
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            No recipes configured yet
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Items;
