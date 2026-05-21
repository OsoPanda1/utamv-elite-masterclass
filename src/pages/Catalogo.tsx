import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { COURSES } from "@/data/coursesData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, GraduationCap, BookOpen, Award } from "lucide-react";

const Catalogo = () => {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<string>("Todos");

  const levels = useMemo(
    () => ["Todos", ...Array.from(new Set(COURSES.map((c) => c.level)))],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COURSES.filter(
      (c) =>
        (level === "Todos" || c.level === level) &&
        (q === "" ||
          c.title.toLowerCase().includes(q) ||
          c.subtitle.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q))
    );
  }, [query, level]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/60">
        <div className="container mx-auto px-4 py-10">
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">
            Catálogo Académico UTAMV
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Programas, Diplomados y Certificaciones
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Catálogo unificado de la oferta académica UTAMV: estructura curricular,
            módulos, horas, instructor y valor de inscripción en MXN/USD.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <Input
            placeholder="Buscar por título, categoría o tema..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="md:max-w-md"
          />
          <div className="flex flex-wrap gap-2">
            {levels.map((l) => (
              <Button
                key={l}
                size="sm"
                variant={level === l ? "default" : "outline"}
                onClick={() => setLevel(l)}
              >
                {l}
              </Button>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          {filtered.length} de {COURSES.length} programas
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <Card key={c.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{c.level}</Badge>
                  {c.isFeatured && <Badge>Destacado</Badge>}
                </div>
                <CardTitle className="text-lg leading-tight">{c.title}</CardTitle>
                <CardDescription>{c.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {c.description}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {c.hours} hrs
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> {c.modules.length} módulos
                  </span>
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" /> {c.instructorName}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" /> {c.category}
                  </span>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
                  <div>
                    <p className="text-lg font-display font-bold text-foreground">
                      ${c.priceMXN.toLocaleString("es-MX")} MXN
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      ${c.priceUSD} USD
                    </p>
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link to={`/programas/${c.slug}`}>Ver programa</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No se encontraron programas con esos criterios.
          </p>
        )}
      </main>
    </div>
  );
};

export default Catalogo;
