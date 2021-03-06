<?php

namespace App\Http\Middleware;

use Closure;

class CORS
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        //autorisation a la partie front pour utiliser les methode dans la partie back ...
        
        
        
        //header('Acess-Control-Allow-Origin: Content-type, X-Auth-Token, Authorization, Origin');
        return $next($request)
        ->header('Access-Control-Allow-Origin', '*');
        header("Access-Control-Allow-Methods","*");


    }
}
